import EventContract from '../contracts/Event.json'
import contract from 'truffle-contract'

export default function(web3, contractAddress, ownerHash, ticketID, ticketPrice) {
  const eventContract = contract(EventContract)
  eventContract.setProvider(web3.currentProvider)

  return new Promise(function(resolve, reject) {
    eventContract.at(contractAddress).then(instance => {
      instance.purchaseTicket(
        ticketID,
        ownerHash,
        {
          from: web3.eth.accounts[0],
          to: contractAddress,
          value: ticketPrice,
          gas: 500000
        }
      ).then(data => {
        resolve(data)
      })
    })
  })
}
