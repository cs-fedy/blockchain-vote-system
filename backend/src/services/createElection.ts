import { electionCreated } from '../jobs'

type CreateElectionArgs = {
  label: string
  startDate: Date
  endDate: Date
}

const createElection = async (args: CreateElectionArgs) => {
  electionCreated(args)
}

export default createElection
