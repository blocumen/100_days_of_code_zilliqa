


// base - mapping (_KeyType => _ValueType) mapName




contract Crowdfunding {
struct CampaignData {
    address recipient;
    uint contributed;
    uint goal;
    uint deadline;
    uint num_contributions;
    mapping(uint => Contribution) contributions;
}

struct Contribution {
    address contributor;
    uint amount;
}

uint nextCampaignId;

// from the base example of mapping
// mapping (_KeyType => _ValueType) mapName


mapping(uint256 => CampaignData) campaigns;

// the uint256 is the _KeyType and the CampaignData is the _ValueType. 
// Note for later that the _ValueType, CampaignData, is a struct.
// Map name is campaigns.

// Start a new campaign.


//  By default, a mapping is initially empty, so new a _KeyType will first need to be mapped to a _ValueType
function start(address recipient, uint256 goal, uint256 deadline) returns (uint id) {
    var campaign = campaigns[nextCampaignId];
    campaign.recipient = recipient;
    campaign.goal = goal;
    campaign.deadline = deadline;
    nextCampaignId ++;
    id = nextCampaignId;
}