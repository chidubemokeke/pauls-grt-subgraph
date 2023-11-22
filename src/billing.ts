import { BigInt } from '@graphprotocol/graph-ts'
import {
  TokensAdded as TokensAddedEvent,
  TokensPulled as TokensPulledEvent,
  TokensRemoved as TokensRemovedEvent,
} from '../generated/Billing/Billing'
import { Account, Subgraph } from '../generated/schema'

// Existing handleTokensAdded function
// ...

// Existing handleTokensRemoved function
// ...

// New handler for TokensPulled event
export function handleTokensPulled(event: TokensPulledEvent): void {
  let accountId = event.params.user.toHexString()
  let account = Account.load(accountId)

  if (!account) {
    account = new Account(accountId)
    // Initialize other fields for the account
  }

  // Logic to handle tokens pulled
  // This is where you'll add your specific logic for what should happen
  // when tokens are pulled. This might involve updating the account's
  // balance, recording the transaction, etc.

  // Example: Update account balance (this is just a placeholder, adjust as needed)
  // account.balance = account.balance.minus(event.params.amount)

  account.save()
}

// Continue with any other event handlers as needed
