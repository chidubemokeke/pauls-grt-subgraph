import { BigInt } from '@graphprotocol/graph-ts'
import {
  TokensAdded as TokensAddedEvent,
  TokensPulled as TokensPulledEvent,
  TokensRemoved as TokensRemovedEvent,
  BillingBalanceUpdated as BillingBalanceUpdatedEvent, // Import the event
} from '../generated/Billing/Billing'
import { Account, Subgraph } from '../generated/schema'

// Existing handleTokensAdded function
// ...

// Existing handleTokensRemoved function
// ...

// Existing handleTokensPulled function
// ...

// New handler for BillingBalanceUpdated event
export function handleBillingBalanceUpdated(
  event: BillingBalanceUpdatedEvent,
): void {
  let subgraphId = event.params.subgraphId.toString()
  let subgraph = Subgraph.load(subgraphId)

  if (!subgraph) {
    subgraph = new Subgraph(subgraphId)
    // Initialize other fields for the subgraph as necessary
  }

  // Update the billing balance
  subgraph.billingBalance = event.params.newBalance
  subgraph.save()
}

// Continue with any other event handlers as needed
