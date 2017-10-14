import EventContract from '../contracts/Event.json'
import contract from 'truffle-contract'

export default function(web3, numTickets, identifiers, prices) {
  const eventContract = contract(EventContract)
  eventContract.setProvider(web3.currentProvider)

  return eventContract.new(
    numTickets,
    identifiers,
    prices,
    { from: web3.eth.accounts[0], gas: 4712388 }
  )
}
