<template>
  <q-page class="flex flex-center bg-grey-8">
    <q-list style="width: 50%" dark v-if="proceed">
      <q-expansion-item
        dark
        group="somegroup"
        icon="link"
        label="Step 1 - Connect ZilPay"
        default-opened
        header-class="bg-grey-10 text-white"
        style="width: 100%"
      >
        <q-card class="bg-grey-9" text-color="white">
          <q-card-section>
            <q-form dark @submit="onSubmit">
              <!-- <p v-if="$v.form.password.$error">The input is needed!</p> -->
              <div class="row no-wrap">
                <q-btn
                  no-caps
                  color="grey-8"
                  type="submit"
                  class="q-mr-sm full-width"
                >
                  <span>Connect to ZilPay</span>
                </q-btn>
              </div>
            </q-form>
          </q-card-section>
          <q-card-section>
            <div>Address : {{ this.wallet.address_base16 }}</div>
            <div>
              Your Balance :
              <q-chip>{{ this.wallet.balance }}</q-chip>
              Zils
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item
        group="somegroup"
        icon="travel_explore"
        label="Hello World Explorer (Testing only)"
        header-class="bg-grey-10 text-white"
      >
        <q-card dark class="bg-grey-9" text-color="white">
          <q-card-section>
            <q-input
              dark
              filled
              bottom-slots
              v-model="smartContract.address"
              label="Smart Contract Address"
              counter
              maxlength="120"
              class="q-mb-sm"
            >
              <template v-slot:hint>
                Enter Smart Contract Address and hit >> to verify smart contract
                address
              </template>

              <template v-slot:after>
                <q-btn
                  round
                  dense
                  flat
                  icon="send"
                  @click.native="validateSamrtContract()"
                />
                <q-icon
                  v-if="smartContract.isValid"
                  class="text-green"
                  name="verified"
                />
              </template>
            </q-input>

            <q-input
              v-if="smartContract.isValid"
              dark
              filled
              bottom-slots
              v-model="helloContract.setterText"
              label="Set Welcome Message"
              maxlength="120"
              class="q-mb-sm"
            >
              <template v-slot:after>
                <q-btn flat color="primary" @click.native="setHello()">
                  <span v-if="!loading">Set Hello</span>
                  <q-spinner-dots v-else />
                </q-btn>
                <q-btn flat color="secondary" @click.native="getHello()">
                  <span v-if="!loading">Get Hello</span>
                  <q-spinner-dots v-else />
                </q-btn>
              </template>
            </q-input>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <div class="q-pa-md" style="">
              <q-input
                dark
                v-model="smartContract.responseText"
                filled
                type="textarea"
                readonly
              />
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item
        group="somegroup"
        icon="description"
        label="Step 2 - View Product Details"
        header-class="bg-grey-10 text-white"
      >
        <q-card dark class="bg-grey-9" text-color="white"> </q-card>
      </q-expansion-item>
      <q-expansion-item
        group="somegroup"
        icon="description"
        label="Step 3 - Purchase Coverage"
        header-class="bg-grey-10 text-white"
      >
        <q-card dark class="bg-grey-9" text-color="white"> </q-card>
      </q-expansion-item>
      <q-expansion-item
        group="somegroup"
        icon="description"
        label="Step 4 - Pay Premium"
        header-class="bg-grey-10 text-white"
      >
        <q-card dark class="bg-grey-9" text-color="white"> </q-card>
      </q-expansion-item>
    </q-list>

    <q-dialog v-model="alert" dark no-backdrop-dismiss v-if="!proceed">
      <q-card style="width: 80%; max-width: 350px">
        <q-card-section>
          <div class="text-h6">Sorry! We can't Proceed</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          We need ZilPay to continue. Please install
          <a href="https://zilpay.io/"> ZilPay</a> and visit again
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { QSpinnerDots } from "quasar";
import { BN, Long, bytes, units } from "@zilliqa-js/util";
import { Zilliqa } from "@zilliqa-js/zilliqa";
import { StatusType, MessageType } from "@zilliqa-js/subscriptions";

export default {
  components: {
    QSpinnerDots,
  },
  data() {
    return {
      model: null,
      alert: true,
      loading: false,
      proceed: false,
      walletConnected: false,
      showWalletConnetOption: true,
      wallet: {
        address_base16: null,
        address_bech32: null,
        balance: 0,
        contract: null,
      },
      smartContract: {
        address: null,
        contractState: null,
        isValid: false,
        responseText: "*** Log Messages appear here ***",
      },
      helloContract: {
        setterText: "",
      },
      zilliqa: null,
    };
  },
  computed: {
    balance: function () {
      if (!this.walletConnected) {
        return "Unavailable";
      } else {
        const addr = this.address_base16.substring(2);

        return "";
      }
    },
  },
  methods: {
    async onSubmit() {
      const isConnect = await window.zilPay.wallet.connect();
      this.walletConnected = isConnect;
      this.wallet.address_base16 = window.zilPay.wallet.defaultAccount.base16;
      this.wallet.address_bech32 = window.zilPay.wallet.defaultAccount.bech32;
      this.$q.localStorage.set("address_base16", this.wallet.address_base16);
      this.$q.localStorage.set("address_bech32", this.wallet.address_bech32);
      console.log(this.$q.localStorage.getItem("address_bech32"));
      this.getWalletBalance();
    },

    async getWalletBalance() {
      let balanceState = await this.zilliqa.blockchain.getBalance(
        this.wallet.address_bech32
      );
      if (balanceState) {
        let balance = balanceState.result.balance;
        balance = units.fromQa(new BN(balance), units.Units.Zil);
        this.wallet.balance = balance;
      }
    },

    validateSamrtContract() {
      if (this.smartContract.address == null) {
        this.$q.notify({
          message:
            "Smart Contract Address is null, please input Smart Contract address to validate",
          type: "negative",
        });
        return;
      }
      console.log("Validating : " + this.smartContract.address);
      try {
        const contract = this.zilliqa.contracts.at(this.smartContract.address);
        console.log(contract);
        if (contract) {
          this.smartContract.contract = contract;
          this.smartContract.isValid = true;
        } else {
          this.smartContract.isValid = false;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async setHello() {
      if (!this.smartContract.isValid) {
        this.$q.notify({
          message:
            "Unknown Smart Contract, please input Smart Contract address and vaidate",
          type: "negative",
        });
        return;
      }

      if (this.helloContract.setterText == "") {
        this.$q.notify({
          message: "Welcome Message is empty",
          type: "negative",
        });
        return;
      }
      this.smartContract.responseText =
        this.smartContract.responseText + "\n" + "Contacting smart contract...";
      this.loading = true;
      const CHAIN_ID = 333;
      const MSG_VERSION = 1;
      const VERSION = bytes.pack(CHAIN_ID, MSG_VERSION);

      const myGasPrice = units.toQa("2000", units.Units.Li); // Gas Price that will be used by all transactions

      try {
        this.smartContract.responseText =
          this.smartContract.responseText + "\n" + "Invoking transition";
        await this.smartContract.contract.call(
          "setHello",
          [
            {
              vname: "msg",
              type: "String",
              value: this.helloContract.setterText,
            },
          ],
          {
            // amount, gasPrice and gasLimit must be explicitly provided
            version: VERSION,
            amount: new BN(0),
            gasPrice: myGasPrice,
            gasLimit: Long.fromNumber(10000),
          }
        );
        this.smartContract.responseText =
          this.smartContract.responseText +
          "\n" +
          "transition invoked.. awaiting response";
        this.subscribeToEventLog();
      } catch (error) {
        console.log(error);
      }
    },

    async getHello() {
      if (!this.smartContract.isValid) {
        this.$q.notify({
          message:
            "Unknown Smart Contract, please input Smart Contract address and vaidate",
          type: "negative",
        });
        return;
      }
      this.loading = true;
      this.smartContract.responseText =
        this.smartContract.responseText + "\n" + "Connecting to Smart Contract";
      const CHAIN_ID = 333;
      const MSG_VERSION = 1;
      const VERSION = bytes.pack(CHAIN_ID, MSG_VERSION);

      const myGasPrice = units.toQa("2000", units.Units.Li); // Gas Price that will be used by all transactions

      try {
        this.smartContract.responseText =
          this.smartContract.responseText + "\n" + "Invoking transition";
        const txResp = await this.smartContract.contract.call("getHello", [], {
          // amount, gasPrice and gasLimit must be explicitly provided
          version: VERSION,
          amount: new BN(0),
          gasPrice: myGasPrice,
          gasLimit: Long.fromNumber(10000),
        });
        this.smartContract.responseText =
          this.smartContract.responseText +
          "\n" +
          "Transition invoked successfully";
        this.subscribeToEventLog();
      } catch (error) {
        console.log(error);
      }
    },

    async subscribeToEventLog() {
      const zilliqa = new Zilliqa("https://dev-api.zilliqa.com");
      console.log(
        "Subscribing to event from smart contract at " +
          this.smartContract.address
      );
      const subscriber = zilliqa.subscriptionBuilder.buildEventLogSubscriptions(
        "wss://dev-ws.zilliqa.com",
        {
          // Smart Contract address
          addresses: [this.smartContract.address],
        }
      );

      subscriber.emitter.on(StatusType.SUBSCRIBE_EVENT_LOG, (event) => {
        // if subscribe success, it will echo the subscription info
        console.log("get SubscribeEventLog echo : ", event);
      });

      subscriber.emitter.on(MessageType.EVENT_LOG, (event) => {
        console.log("get new event log: ", JSON.stringify(event));
        if (event.hasOwnProperty("value")) {
          console.log(event.value[0].event_logs[0]._eventname);
          if (event.value[0].event_logs[0]._eventname == "getHello") {
            let welcomeMsg = event.value[0].event_logs[0].params[0].value;
            this.helloContract.responseText = welcomeMsg;
            this.loading = false;
            this.smartContract.responseText =
              this.smartContract.responseText +
              "\n" +
              "Message Recieved : " +
              welcomeMsg;
          } else if (event.value[0].event_logs[0]._eventname == "setHello") {
            this.loading = false;
            this.smartContract.responseText =
              this.smartContract.responseText +
              "\n" +
              "Message set successfully";
            this.loading = false;
          }
        }
      });

      await subscriber.start();
    },

    async getContractState() {
      const contract = this.zilliqa.contracts.at(this.address_bech32);
      this.contractState = await contract.getState();
      console.log(this.contractState);
    },
  },

  created() {
    if (typeof window.zilPay !== "undefined") {
      this.zilliqa = window.zilPay;
      this.proceed = true;
    } else {
      console.log("Seems you do not have ZilPay");
    }
  },
};
</script>

<style lang="stylus">
#login {
  .mid-bg {
    background: $primary;
    height: 50vh;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

  .login-card {
    padding: 50px;
    width: 40%;
    margin: 0 auto;
    position: fixed;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 50%;

    @media (max-width: 400px) {
      padding: 20px;
      width: 90%;
    }

    @media (max-width: 1000px) {
      width: 80%;
    }

    .login-title {
      color: rgba(0, 0, 0, 0.5);
      font-weight: bold;
      text-align: center;
      padding-bottom: 20px;
    }
  }
}
</style>
