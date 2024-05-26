pragma solidity ^0.8.0;

contract Transaction {
    struct Buyer {
        string name;
        string email;
        string contact_no;
        string cnic;
    }

    struct Plot {
        string phase;
        string plot_no;
        string property;
        uint no_of_square_feet;
    }

    struct TransactionRecord {
        uint id;
        Buyer buyer;
        Plot plot;
        uint price;
        bool isConstructed;
        string paymentMethod;
    }

    mapping(uint => TransactionRecord) public transactions;

    function getTransaction(
        uint _id
    )
        public
        view
        returns (uint, Buyer memory, Plot memory, uint, bool, string memory)
    {
        TransactionRecord memory transaction = transactions[_id];
        return (
            transaction.id,
            transaction.buyer,
            transaction.plot,
            transaction.price,
            transaction.isConstructed,
            transaction.paymentMethod
        );
    }

    function createTransaction(
        uint _id,
        Buyer memory _buyer,
        Plot memory _plot,
        uint _price,
        bool _isConstructed,
        string memory _paymentMethod
    ) public {
        transactions[_id] = TransactionRecord({
            id: _id,
            buyer: _buyer,
            plot: _plot,
            price: _price,
            isConstructed: _isConstructed,
            paymentMethod: _paymentMethod
        });
    }
}
