import { choiceCreated } from '../jobs'

type CreateChoiceArgs = {
  electionId: string
  label: string
  avatarURL: string
}

const createChoice = async (args: CreateChoiceArgs) => {
  choiceCreated(args)
}

export default createChoice
