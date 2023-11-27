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
  let subgraph = new SubgraphEntity(event.params.[CORRECT_SUBGRAPH_ID_PROPERTY].toHex())
  subgraph.name = "Default Name" // Replace with actual logic
  subgraph.account = // Set the account based on your event data
  subgraph.currentVersionHash = event.params.[CORRECT_VERSION_HASH_PROPERTY].toHexString()
  subgraph.previousVersionHash = null
  subgraph.save()
}

// Handle SubgraphUpgraded Event
export function handleSubgraphUpgraded(event: SubgraphUpgradedEvent): void {
  let subgraph = SubgraphEntity.load(event.params.[CORRECT_SUBGRAPH_ID_PROPERTY].toHex())

  if (subgraph) {
    subgraph.previousVersionHash = subgraph.currentVersionHash
    subgraph.currentVersionHash = event.params.[CORRECT_NEW_VERSION_HASH_PROPERTY].toHexString()
    subgraph.save()
  }
}

// Continue with other event handlers as needed
