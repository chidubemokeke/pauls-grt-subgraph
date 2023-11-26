import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  SubgraphPublished as SubgraphPublishedEvent,
  SubgraphVersionUpdated as SubgraphVersionUpdatedEvent,
  SubgraphUpgraded as SubgraphUpgradedEvent,
  SubgraphReceivedFromL1 as SubgraphReceivedFromL1Event,
  // Import other necessary events
} from "../generated/GNS/GNS";
import {
  Subgraph as SubgraphEntity,
  Account,
  Transaction,
  // Import other necessary schema entities
} from "../generated/schema";

// Existing handlers...

export function handleSubgraphReceivedFromL1(
  event: SubgraphReceivedFromL1Event
): void {
  // Assuming you have an entity to represent a subgraph received from L1
  let subgraph = SubgraphEntity.load(event.params._l1SubgraphID.toHex());

  if (!subgraph) {
    subgraph = new SubgraphEntity(event.params._l1SubgraphID.toHex());
    // Initialize other fields for the subgraph as necessary
  }

  // Update fields related to the subgraph received from L1
  subgraph.id = event.params._l2SubgraphID.toHex(); // Set the appropriate field here
  // Update other fields as necessary
  subgraph.name = event.params._owner.toHexString();
  subgraph.account = event.params._event.address.toHexString();

  subgraph.save();
}

// Continue with other event handlers as needed
