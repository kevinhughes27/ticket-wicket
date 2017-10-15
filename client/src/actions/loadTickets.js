import EventContract from '../contracts/Event.json'
import contract from 'truffle-contract'

export default function(web3, contractAddress) {
  const eventContract = contract(EventContract)
  eventContract.setProvider(web3.currentProvider)

  return new Promise(function(resolve, reject) {
    eventContract.at(contractAddress).then((instance) => {
      instance.getTickets.call().then((data) => {
        let tickets = []
        let numTickets = data[0].length

        for (let i = 0; i < numTickets; i++) {
          tickets.push({
            identifier: data[0][i].toNumber(),
            price: data[1][i].toNumber(),
            isSold: data[2][i],
          })
        }

        resolve(tickets)
      })
    })
  })
}
