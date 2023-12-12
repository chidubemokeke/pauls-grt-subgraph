import { BigInt } from '@graphprotocol/graph-ts'
import {
  TokensAdded as TokensAddedEvent,
  TokensPulled as TokensPulledEvent,
  TokensRemoved as TokensRemovedEvent,
  // Import other events if needed
} from '../generated/Billing/Billing'
import { Account as AccountEntity } from '../generated/schema'

// Handle the TokensAdded event
export function createOrLoadAccount(id: string): AccountEntity {
  let account = AccountEntity.load(id)
  if (account == null) {
    account = new AccountEntity(id)
    account.billingBalance = BigInt.fromI32(0)
    account.queryFeesPaid = BigInt.fromI32(0)
  }
  return account
}

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

import {
  SubgraphPublished as SubgraphPublishedEvent,
  SubgraphUpgraded as SubgraphUpgradedEvent,
  SubgraphVersionUpdated as SubgraphVersionUpdatedEvent,
} from '../generated/GNS/GNS'
import { Subgraph as SubgraphEntity } from '../generated/schema'

// Handle SubgraphPublished event
export function handleSubgraphPublished(event: SubgraphPublishedEvent): void {
  let subgraph = SubgraphEntity.load(event.params.subgraphID.toHex())
  if (subgraph == null) {
    subgraph = new SubgraphEntity(event.params.subgraphID.toHex())
    // Initialize other fields as necessary, including subgraph name
    // subgraph.name = [Retrieve and assign subgraph name from event];
  }
  subgraph.currentVersionHash = event.params.subgraphDeploymentID.toHex()
  subgraph.save()
}

// Handle SubgraphUpgraded event
export function handleSubgraphUpgraded(event: SubgraphUpgradedEvent): void {
  let id = event.params.subgraphID.toHex()
  let subgraph = SubgraphEntity.load(id)

  if (!subgraph) {
    subgraph = new SubgraphEntity(id)
    // Initialize other fields as necessary
  }

  // The event provides a subgraphDeploymentID, which you might want to store
  subgraph.currentVersionHash = event.params.subgraphDeploymentID.toHex()

  // You can access other parameters like oldVersion, newVersion, and versionMetadata
  // event.params.oldVersion
  // event.params.newVersion
  // event.params.versionMetadata

  subgraph.save()
}

// Handle SubgraphVersionUpdated event
export function handleSubgraphVersionUpdated(
  event: SubgraphVersionUpdatedEvent,
): void {
  let id = event.params.subgraphID.toHex()
  let subgraph = SubgraphEntity.load(id)

  if (!subgraph) {
    subgraph = new SubgraphEntity(id)
    subgraph.queryFees = new BigInt(0)
    // Initialize other fields as necessary
  }

  // The event provides a subgraphDeploymentID, which you might want to store
  subgraph.currentVersionHash = event.params.subgraphDeploymentID.toHex()

  // The event also provides versionMetadata, which you might want to store
  // Assuming you have a field in your Subgraph entity to store this metadata
  // subgraph.versionMetadata = event.params.versionMetadata

  subgraph.save()
}
