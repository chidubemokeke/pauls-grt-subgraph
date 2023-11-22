import { BigInt } from '@graphprotocol/graph-ts'
import {
  TokensAdded as TokensAddedEvent,
  TokensRemoved as TokensRemovedEvent,
} from '../generated/Billing/Billing'
import { Account, Subgraph } from '../generated/schema'

export function handleTokensAdded(event: TokensAddedEvent): void {
  let accountId = event.params.user.toHexString()
  let account = Account.load(accountId)

  if (!account) {
    account = new Account(accountId)
    // Initialize other fields for the account
  }

  // Logic to handle tokens added
  // Update account balance or other relevant fields
  // ...

  account.save()
}

export function handleTokensRemoved(event: TokensRemovedEvent): void {
  let accountId = event.params.from.toHexString()
  let account = Account.load(accountId)

  if (!account) {
    account = new Account(accountId)
    // Initialize other fields for the account
  }

  // Logic to handle tokens removed
  // Update account balance or other relevant fields
  // ...

  account.save()
}

// Add similar handlers for other events like TokensPulled, etc.
