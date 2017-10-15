import EventContract from '../contracts/Event.json'
import contract from 'truffle-contract'
import getAccounts from '../utils/getAccounts.js'

export default function(web3, numTickets, identifiers, prices) {
  const eventContract = contract(EventContract)
  eventContract.setProvider(web3.currentProvider)

  return getAccounts(web3).then(accts => {
    return eventContract.new(
      numTickets,
      identifiers,
      prices,
      { from: accts[0], gas: 4712388 }
    )
  })
}
