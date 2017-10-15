import EventContract from '../contracts/Event.json'
import contract from 'truffle-contract'
import getAccounts from '../utils/getAccounts.js'

export default function(web3, contractAddress, ownerHash, ticketID, ticketPrice) {
  const eventContract = contract(EventContract)
  eventContract.setProvider(web3.currentProvider)

  return Promise.all([
        eventContract.at(contractAddress),
        getAccounts(web3)
      ]).then(([instance, accts]) => {
        return instance.purchaseTicket(
          ticketID,
          ownerHash,
          {
            from: accts[0],
            to: contractAddress,
            value: ticketPrice,
            gas: 500000
          })
      })
}
