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

// Token Handlers

export function handleTokensAdded(event: TokensAddedEvent): void {
  let account = createOrLoadAccount(event.params.user.toHex())
  account.billingBalance = account.billingBalance.plus(event.params.amount)
  account.queryFeesPaid = account.queryFeesPaid.plus(event.params.amount)
  account.save()
}

export function handleTokensPulled(event: TokensPulledEvent): void {
  let account = createOrLoadAccount(event.params.user.toHex())
  account.billingBalance = account.billingBalance.minus(event.params.amount)
  account.save()
}

export function handleTokensRemoved(event: TokensRemovedEvent): void {
  let account = createOrLoadAccount(event.params.from.toHex())
  account.billingBalance = account.billingBalance.minus(event.params.amount)
  account.save()
}

// Subgraph Handlers

export function handleSubgraphPublished(event: SubgraphPublishedEvent): void {
  let subgraph = new SubgraphEntity(event.params.subgraphID.toHex())
  // Retrieve and assign subgraph name and other properties from event or external source
  subgraph.currentVersionHash = event.params.subgraphDeploymentID.toHex()
  // Link to the corresponding account
  let account = createOrLoadAccount(event.transaction.from.toHexString())
  subgraph.account = account.id
  // Assign query fees and other properties
  subgraph.queryFees = BigInt.zero()
  subgraph.save()
}

export function handleSubgraphUpgraded(event: SubgraphUpgradedEvent): void {
  let subgraph = SubgraphEntity.load(event.params.subgraphID.toHex())
  // Logic to handle subgraph upgrade
  subgraph.currentVersionHash = event.params.subgraphDeploymentID.toHex()
  subgraph.save()
}

export function handleSubgraphVersionUpdated(
  event: SubgraphVersionUpdatedEvent,
): void {
  let subgraph = SubgraphEntity.load(event.params.subgraphID.toHex())
  // Logic to handle subgraph version update
  subgraph.currentVersionHash = event.params.subgraphDeploymentID.toHex()
  subgraph.save()
}
