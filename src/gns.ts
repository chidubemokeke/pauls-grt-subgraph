import { BigInt } from '@graphprotocol/graph-ts'
import {
  TokensAdded as TokensAddedEvent,
  TokensPulled as TokensPulledEvent,
  TokensRemoved as TokensRemovedEvent,
} from '../generated/Billing/Billing'
import {
  SubgraphPublished as SubgraphPublishedEvent,
  SubgraphUpgraded as SubgraphUpgradedEvent,
  SubgraphVersionUpdated as SubgraphVersionUpdatedEvent,
} from '../generated/GNS/GNS'
import {
  Account as AccountEntity,
  Subgraph as SubgraphEntity,
} from '../generated/schema'

// Handle the TokensAdded event
export function handleTokensAdded(event: TokensAddedEvent): void {
  let account = AccountEntity.load(event.params.user.toHex())
  if (!account) {
    account = new AccountEntity(event.params.user.toHex())
    account.billingBalance = BigInt.fromI32(0)
    account.queryFeesPaid = BigInt.fromI32(0)
  }
  account.billingBalance = account.billingBalance.plus(event.params.amount)
  account.save()
}

// Handle the TokensPulled event
export function handleTokensPulled(event: TokensPulledEvent): void {
  let account = AccountEntity.load(event.params.user.toHex())
  if (!account) {
    account = new AccountEntity(event.params.user.toHex())
    account.billingBalance = BigInt.fromI32(0)
    account.queryFeesPaid = BigInt.fromI32(0)
  }
  account.billingBalance = account.billingBalance.minus(event.params.amount)
  account.save()
}

// Handle the TokensRemoved event
export function handleTokensRemoved(event: TokensRemovedEvent): void {
  let account = AccountEntity.load(event.params.from.toHex())
  if (!account) {
    account = new AccountEntity(event.params.from.toHex())
    account.billingBalance = BigInt.fromI32(0)
    account.queryFeesPaid = BigInt.fromI32(0)
  }
  account.billingBalance = account.billingBalance.minus(event.params.amount)
  account.save()
}

// Handle SubgraphPublished event
export function handleSubgraphPublished(event: SubgraphPublishedEvent): void {
  let subgraph = new SubgraphEntity(event.params.subgraphID.toHex())
  subgraph.name = event.params.name
  subgraph.queryFees = BigInt.fromI32(0)

  let account = AccountEntity.load(event.params.publisher.toHex())
  if (!account) {
    account = new AccountEntity(event.params.publisher.toHex())
    account.queryFeesPaid = BigInt.fromI32(0)
    account.billingBalance = BigInt.fromI32(0)
  }
  subgraph.account = account.id
  subgraph.save()
}

// Handle SubgraphUpgraded event
export function handleSubgraphUpgraded(event: SubgraphUpgradedEvent): void {
  let subgraph = SubgraphEntity.load(event.params.subgraphID.toHex())
  if (subgraph) {
    subgraph.previousVersionHash = subgraph.currentVersionHash
    subgraph.currentVersionHash = event.params.newSubgraphDeploymentID.toHex()
    subgraph.save()
  }
}

// Handle SubgraphVersionUpdated event
export function handleSubgraphVersionUpdated(
  event: SubgraphVersionUpdatedEvent,
): void {
  let subgraph = SubgraphEntity.load(event.params.subgraphID.toHex())
  if (subgraph) {
    subgraph.currentVersionHash = event.params.subgraphDeploymentID.toHex()
    subgraph.save()
  }
}

// Example: Handler for a hypothetical QueryFeesPaid event
export function handleQueryFeesPaid(event: QueryFeesPaidEvent): void {
  let account = AccountEntity.load(event.params.user.toHex())
  if (!account) {
    account = new AccountEntity(event.params.user.toHex())
    account.billingBalance = BigInt.fromI32(0)
    account.queryFeesPaid = BigInt.fromI32(0)
  }

  // Increment the queryFeesPaid by the amount in the event
  account.queryFeesPaid = account.queryFeesPaid.plus(event.params.amount)
  account.save()
}
