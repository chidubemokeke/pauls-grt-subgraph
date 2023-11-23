import { BigInt } from '@graphprotocol/graph-ts'
import {
  TokensAdded as TokensAddedEvent,
  TokensRemoved as TokensRemovedEvent,
  TokensPulled as TokensPulledEvent,
  InsufficientBalanceForRemoval as InsufficientBalanceForRemovalEvent,
} from '../generated/Billing/Billing'
import { Account } from '../generated/schema'

// Handle TokensAdded event
export function handleTokensAdded(event: TokensAddedEvent): void {
  let accountId = event.params.user.toHex()
  let account = Account.load(accountId)

  if (!account) {
    account = new Account(accountId)
    account.balance = BigInt.fromI32(0)
  }

  account.balance = account.balance.plus(event.params.amount)
  account.save()
}

// Handle TokensRemoved event
export function handleTokensRemoved(event: TokensRemovedEvent): void {
  let accountId = event.params.from.toHex()
  let account = Account.load(accountId)

  if (account) {
    account.balance = account.balance.minus(event.params.amount)
    account.save()
  }
}

// Handle TokensPulled event
export function handleTokensPulled(event: TokensPulledEvent): void {
  let accountId = event.params.user.toHex()
  let account = Account.load(accountId)

  if (account) {
    account.balance = account.balance.minus(event.params.amount)
    account.save()
  }
}

// Handle InsufficientBalanceForRemoval event (optional)
export function handleInsufficientBalanceForRemoval(
  event: InsufficientBalanceForRemovalEvent,
): void {
  // This event does not affect the balance but can be logged or used for analytics
}

// Continue with any other event handlers as needed
