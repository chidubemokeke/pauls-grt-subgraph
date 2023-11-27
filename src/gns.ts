import { BigInt } from '@graphprotocol/graph-ts'
import {
  TokensAdded as TokensAddedEvent,
  TokensPulled as TokensPulledEvent,
  TokensRemoved as TokensRemovedEvent,
} from '../generated/Billing/Billing'
import { Account as AccountEntity } from '../generated/schema'

// Handlers for the Billing Contract
export function handleTokensAdded(event: TokensAddedEvent): void {
  let account = AccountEntity.load(event.params.user.toHex())
  if (!account) {
    account = new AccountEntity(event.params.user.toHex())
    account.billingBalance = BigInt.fromI32(0)
  }
  account.billingBalance = account.billingBalance.plus(event.params.amount)
  account.save()
}

export function handleTokensPulled(event: TokensPulledEvent): void {
  let account = AccountEntity.load(event.params.user.toHex())
  if (account) {
    account.billingBalance = account.billingBalance.minus(event.params.amount)
    account.save()
  }
}

export function handleTokensRemoved(event: TokensRemovedEvent): void {
  let account = AccountEntity.load(event.params.from.toHex())
  if (account) {
    account.billingBalance = account.billingBalance.minus(event.params.amount)
    account.save()
  }
}

// Template Handlers for the GNS Contract
// Replace with the actual logic based on your GNS contract's ABI
export function handleSubgraphPublished(event: SubgraphPublishedEvent): void {
  // Implementation logic
}

export function handleSubgraphUpgraded(event: SubgraphUpgradedEvent): void {
  // Implementation logic
}

export function handleSubgraphVersionUpdated(
  event: SubgraphVersionUpdatedEvent,
): void {
  // Implementation logic
}

export function handleSubgraphReceivedFromL1(
  event: SubgraphReceivedFromL1Event,
): void {
  // Implementation logic
}
