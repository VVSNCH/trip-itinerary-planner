import { useState } from 'react'
import { COPY, DIALOGS, EMPTY_STATES, LABELS } from '@/constants'
import {
  AddIcon,
  Button,
  Card,
  ConfirmDialog,
  FloatingButton,
  Text,
} from '@/components/common'
import { EmptyState } from '@/components/feedback'
import { AppLayout } from '@/components/layout'
import {
  createTrip,
  deleteTrip,
  importTrip,
  updateTrip,
  useTrips,
  type TripInput,
} from '@/context'
import type { Day, Trip } from '@/types'
import { todayISO } from '@/utils/dates'
import { plural } from '@/utils/format'
import { daysRemovedByRedate } from '../../utils/days'
import { buildSampleTrip } from '../../utils/sampleTrip'
import { sortTrips } from '../../utils/sortTrips'
import { duplicateTrip, tripStatus } from '../../utils/tripStatus'
import ShareDialog from '@/features/share/components/ShareDialog'
import { ShrinkTripDialog } from '../ShrinkTripDialog/ShrinkTripDialog'
import { TripCard } from '../TripCard/TripCard'
import { TripFormDialog } from '../TripFormDialog/TripFormDialog'
import { EmptyActions, Grid, GridItem, Heading, MobileCreate } from './TripsHome.styles'

type OpenDialog =
  | { kind: 'create' }
  | { kind: 'rename'; trip: Trip }
  | { kind: 'dates'; trip: Trip }
  | { kind: 'shrink'; trip: Trip; changes: TripInput; removedDays: Day[] }
  | { kind: 'delete'; trip: Trip }
  | { kind: 'share'; trip: Trip }
  | null

export const TripsHome = () => {
  const { trips, dispatch } = useTrips()
  const [dialog, setDialog] = useState<OpenDialog>(null)
  const today = todayISO()

  const close = () => setDialog(null)
  const openCreate = () => setDialog({ kind: 'create' })

  const handleCreate = (values: TripInput) => {
    dispatch(createTrip(values))
    close()
  }

  const handleRename = (trip: Trip, values: TripInput) => {
    dispatch(updateTrip(trip.id, { name: values.name }))
    close()
  }

  const handleChangeDates = (trip: Trip, values: TripInput) => {
    const removedDays = daysRemovedByRedate(trip.days, values.startDate, values.endDate)
    if (removedDays.length > 0) {
      setDialog({ kind: 'shrink', trip, changes: values, removedDays })
      return
    }
    dispatch(
      updateTrip(trip.id, { startDate: values.startDate, endDate: values.endDate })
    )
    close()
  }

  const handleConfirmShrink = (trip: Trip, changes: TripInput) => {
    dispatch(
      updateTrip(trip.id, { startDate: changes.startDate, endDate: changes.endDate })
    )
    close()
  }

  const handleDelete = (trip: Trip) => {
    dispatch(deleteTrip(trip.id))
    close()
  }

  const handleSample = () => dispatch(importTrip(buildSampleTrip(new Date())))

  return (
    <AppLayout
      actions={
        <Button startIcon={<AddIcon />} onClick={openCreate}>
          {LABELS.NEW_TRIP}
        </Button>
      }
    >
      <Heading>
        <Text variant="display" as="h1">
          {LABELS.TRIPS}
        </Text>
        {trips.length > 0 && (
          <Text tone="secondary">{COPY.tripsSaved(plural(trips.length, 'trip'))}</Text>
        )}
      </Heading>

      {trips.length === 0 ? (
        <Card>
          <EmptyState
            title={EMPTY_STATES.TRIPS.title}
            description={EMPTY_STATES.TRIPS.description}
            action={
              <EmptyActions>
                <Button startIcon={<AddIcon />} onClick={openCreate}>
                  {LABELS.NEW_TRIP}
                </Button>
                <Button variant="secondary" onClick={handleSample}>
                  {LABELS.SAMPLE_TRIP}
                </Button>
              </EmptyActions>
            }
          />
        </Card>
      ) : (
        <>
          <Grid>
            {sortTrips(trips, today).map((trip, index) => (
              <GridItem key={trip.id} $order={index}>
                <TripCard
                  trip={trip}
                  status={tripStatus(trip, today)}
                  onDuplicate={() =>
                    dispatch(importTrip(duplicateTrip(trip, COPY.copyOf(trip.name))))
                  }
                  onRename={() => setDialog({ kind: 'rename', trip })}
                  onChangeDates={() => setDialog({ kind: 'dates', trip })}
                  onShare={() => setDialog({ kind: 'share', trip })}
                  onDelete={() => setDialog({ kind: 'delete', trip })}
                />
              </GridItem>
            ))}
          </Grid>
          <MobileCreate>
            <FloatingButton
              label={LABELS.NEW_TRIP}
              icon={<AddIcon />}
              onClick={openCreate}
            />
          </MobileCreate>
        </>
      )}

      {dialog?.kind === 'create' && (
        <TripFormDialog
          title={DIALOGS.NEW_TRIP}
          submitLabel={LABELS.CREATE}
          fields="all"
          onSubmit={handleCreate}
          onClose={close}
        />
      )}

      {dialog?.kind === 'rename' && (
        <TripFormDialog
          title={DIALOGS.RENAME_TRIP}
          submitLabel={LABELS.SAVE}
          fields="name"
          initial={dialog.trip}
          onSubmit={(values) => handleRename(dialog.trip, values)}
          onClose={close}
        />
      )}

      {dialog?.kind === 'dates' && (
        <TripFormDialog
          title={DIALOGS.CHANGE_DATES}
          submitLabel={LABELS.SAVE}
          fields="dates"
          initial={dialog.trip}
          onSubmit={(values) => handleChangeDates(dialog.trip, values)}
          onClose={close}
        />
      )}

      {dialog?.kind === 'shrink' && (
        <ShrinkTripDialog
          trip={dialog.trip}
          changes={dialog.changes}
          removedDays={dialog.removedDays}
          onConfirm={() => handleConfirmShrink(dialog.trip, dialog.changes)}
          onCancel={close}
        />
      )}

      {dialog?.kind === 'share' && <ShareDialog trip={dialog.trip} onClose={close} />}

      {dialog?.kind === 'delete' && (
        <ConfirmDialog
          open
          title={DIALOGS.DELETE_TITLE}
          message={COPY.deleteTrip(dialog.trip.name)}
          confirmLabel={DIALOGS.DELETE_CONFIRM}
          onConfirm={() => handleDelete(dialog.trip)}
          onCancel={close}
        />
      )}
    </AppLayout>
  )
}
