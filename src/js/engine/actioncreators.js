/* @flow */
type Action = {
  type: string,
  payload?: any
}

export function addKeystrokes (payload: number): Action {
  return {
    type: 'ADD_KEYSTROKES',
    payload
  }
}

export function addEngineers (payload: number): Action {
  return {
    type: 'ADD_ENGINEERS',
    payload
  }
}

export function addDollars (payload: number): Action {
  return {
    type: 'ADD_DOLLARS',
    payload
  }
}
