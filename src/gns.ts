import {
  SubgraphPublished as SubgraphPublishedEvent,
  SubgraphUpgraded as SubgraphUpgradedEvent,
  // Import other necessary events
} from '../generated/GNS/GNS'
import {
  Subgraph as SubgraphEntity,
  // Import other necessary schema entities
} from '../generated/schema'

// Handle SubgraphPublished Event
export function handleSubgraphPublished(event: SubgraphPublishedEvent): void {
  let subgraph = new SubgraphEntity(event.params.subgraphID.toHex())
  subgraph.name = 'Default Name' // Replace with actual logic to determine name
  subgraph.account = subgraph.currentVersionHash = event.params.versionHash.toHexString() // Set the account based on your event data
  subgraph.previousVersionHash = null // No previous version yet
  subgraph.save()
}

// Handle SubgraphUpgraded Event
export function handleSubgraphUpgraded(event: SubgraphUpgradedEvent): void {
  let subgraph = SubgraphEntity.load(event.params.subgraphID.toHex())

  if (subgraph) {
    // Update the previous version hash to the current one before the upgrade
    subgraph.previousVersionHash = subgraph.currentVersionHash
    // Update the current version hash to the new version
    subgraph.currentVersionHash = event.params.newVersionHash.toHexString()
    subgraph.save()
  }
}

// Continue with other event handlers as needed
