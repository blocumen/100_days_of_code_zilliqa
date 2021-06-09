import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';

contract Mycontract is ERC721, IERC721Metadata, ERC721Enumerable {
        constructor() ERC721MetaData("My super token","MST") ERC721Enumerable() public {}
}


contract MyOtherContract {
    function foo external{
        IERTC21(0x.........).transfer()
    }
}
