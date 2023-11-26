import {
  SubgraphPublished as SubgraphPublishedEvent,
  SubgraphVersionUpdated as SubgraphVersionUpdatedEvent,
  SubgraphUpgraded as SubgraphUpgradedEvent,
  SubgraphReceivedFromL1 as SubgraphReceivedFromL1Event,
  // Import other necessary events
} from '../generated/GNS/GNS'
import {
  Subgraph as SubgraphEntity,
  SubgraphVersion as SubgraphVersionEntity,
  // Import other necessary schema entities
} from '../generated/schema'

// Existing handlers...

export function handleSubgraphUpgraded(event: SubgraphUpgradedEvent): void {
  // Assuming you have an entity to represent an upgraded subgraph
  let subgraph = SubgraphEntity.load(event.params.subgraphID.toHex())

  if (!subgraph) {
    subgraph = new SubgraphEntity(event.params.subgraphID.toHex())
    // Initialize other fields for the subgraph as necessary
  }

  // Update fields related to the subgraph upgrade
  subgraph.currentVersionHash = event.params.newVersionHash.toHexString()
  // Update other fields as necessary
  subgraph.save()
}

export function handleSubgraphReceivedFromL1(
  event: SubgraphReceivedFromL1Event,
): void {
  // Assuming you have an entity to represent a subgraph received from L1
  let subgraph = SubgraphEntity.load(event.params.subgraphID.toHex())

  if (!subgraph) {
    subgraph = new SubgraphEntity(event.params.subgraphID.toHex())
    // Initialize other fields for the subgraph as necessary
  }

  // Update fields related to the subgraph received from L1
  subgraph.someField = // Set the appropriate field here
    // Update other fields as necessary
    subgraph.save()
}

// Continue with other event handlers as needed
