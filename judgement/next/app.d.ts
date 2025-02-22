interface MemberInterface {
  name: string
  bio: string
  website: string
  twitter: string
  logoURI: string
  hotCredHex: string
  coldCredHex : string // use as ID
  hotCredBech: string
  coldCredBech: string
}

interface JudgmentTotalResponse {
  down: number
  up: number
  total: number
}

interface JudgmentResponse {
  judgements: JudgmentInterface[]
  down: number
  up: number
  total: number
}

interface JudgmentInterface {
  judgement: 'up' | 'down'
  reason: string
  balance: string // balance at time of vote
  voter: string // voter address
  member: string // CC member hex address
}
