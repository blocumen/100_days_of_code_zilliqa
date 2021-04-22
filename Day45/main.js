(typeof window.zilPay !== 'undefined') ; { /* do something */ }

window.zilPay.wallet.observableAccount().subscribe(function (account) {
    // ... When the user changes account
});
window.zilPay.wallet.observableNetwork().subscribe(function (net) {
    // ... When the user changes network
});