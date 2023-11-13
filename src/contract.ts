import {
  AdminUpdated as AdminUpdatedEvent,
  ImplementationUpdated as ImplementationUpdatedEvent,
  PendingImplementationUpdated as PendingImplementationUpdatedEvent
} from "../generated/Contract/Contract"
import {
  AdminUpdated,
  ImplementationUpdated,
  PendingImplementationUpdated
} from "../generated/schema"

export function handleAdminUpdated(event: AdminUpdatedEvent): void {
  let entity = new AdminUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldAdmin = event.params.oldAdmin
  entity.newAdmin = event.params.newAdmin

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleImplementationUpdated(
  event: ImplementationUpdatedEvent
): void {
  let entity = new ImplementationUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldImplementation = event.params.oldImplementation
  entity.newImplementation = event.params.newImplementation

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePendingImplementationUpdated(
  event: PendingImplementationUpdatedEvent
): void {
  let entity = new PendingImplementationUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldPendingImplementation = event.params.oldPendingImplementation
  entity.newPendingImplementation = event.params.newPendingImplementation

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
