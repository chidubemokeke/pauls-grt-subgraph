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
  let subgraph = new SubgraphEntity(event.params.actualSubgraphID.toHex())
  subgraph.name = 'Default Name' // Replace with actual logic
  subgraph.account = subgraph.currentVersionHash = event.params.actualVersionHash.toHexString() // Set the account based on your event data
  subgraph.previousVersionHash = null
  subgraph.save()
}

// Handle SubgraphUpgraded Event
export function handleSubgraphUpgraded(event: SubgraphUpgradedEvent): void {
  let subgraph = SubgraphEntity.load(event.params.actualSubgraphID.toHex())

  if (subgraph) {
    subgraph.previousVersionHash = subgraph.currentVersionHash
    subgraph.currentVersionHash = event.params.actualNewVersionHash.toHexString()
    subgraph.save()
  }
}

// Continue with other event handlers as needed
