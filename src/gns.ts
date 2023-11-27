import { BigInt } from '@graphprotocol/graph-ts'
import {
  TokensAdded as TokensAddedEvent,
  TokensPulled as TokensPulledEvent,
  TokensRemoved as TokensRemovedEvent,
  // Import other events if needed
} from '../generated/Billing/Billing'
import { Account as AccountEntity } from '../generated/schema'

// Handle the TokensAdded event
export function handleTokensAdded(event: TokensAddedEvent): void {
  let account = AccountEntity.load(event.params.user.toHex())
  if (!account) {
    account = new AccountEntity(event.params.user.toHex())
    account.billingBalance = BigInt.fromI32(0)
  }
  account.billingBalance = account.billingBalance.plus(event.params.amount)
  account.save()
}

// Handle the TokensPulled event
export function handleTokensPulled(event: TokensPulledEvent): void {
  let account = AccountEntity.load(event.params.user.toHex())
  if (account) {
    account.billingBalance = account.billingBalance.minus(event.params.amount)
    account.save()
  }
}

// Handle the TokensRemoved event
export function handleTokensRemoved(event: TokensRemovedEvent): void {
  let account = AccountEntity.load(event.params.from.toHex())
  if (account) {
    account.billingBalance = account.billingBalance.minus(event.params.amount)
    account.save()
  }
}

import {
  SubgraphPublished as SubgraphPublishedEvent,
  SubgraphUpgraded as SubgraphUpgradedEvent,
  SubgraphVersionUpdated as SubgraphVersionUpdatedEvent,
  SubgraphUpdated as SubgraphUpdatedEvent,
} from '../generated/GNS/GNS'
import { Subgraph as SubgraphEntity } from '../generated/schema'

// Handle SubgraphPublished event
export function handleSubgraphPublished(event: SubgraphPublishedEvent): void {
  let id = event.params.subgraphID.toHex()
  let subgraph = SubgraphEntity.load(id)

  if (!subgraph) {
    subgraph = new SubgraphEntity(id)
    // Initialize other fields as necessary
  }

  // The event provides a subgraphDeploymentID, which you might want to store
  subgraph.currentVersionHash = event.params.subgraphDeploymentID.toHex()

  // The event also provides reserveRatio, which you might want to store
  // Assuming you have a field in your Subgraph entity to store this ratio
  // subgraph.reserveRatio = event.params.reserveRatio

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
    // Initialize other fields as necessary
  }

  // The event provides a subgraphDeploymentID, which you might want to store
  subgraph.currentVersionHash = event.params.subgraphDeploymentID.toHex()

  // The event also provides versionMetadata, which you might want to store
  // Assuming you have a field in your Subgraph entity to store this metadata
  // subgraph.versionMetadata = event.params.versionMetadata

  subgraph.save()
}

// Add other event handlers for Ownership Transferred and other events as needed

// Handle Ownership Transferred event
export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent,
): void {
  // Implement your logic for handling the Ownership Transferred event
}

// Add more event handlers as needed
