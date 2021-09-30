import { createAction, props } from '@ngrx/store';

const setUsername = createAction(
  'Set [User Username]',
  props<{
    username: string
  }>()
);

const logoutUser = createAction(
  'Logout [User token]'
);

export { setUsername, logoutUser };
