import { createAction, props } from '@ngrx/store';

const setUserData = createAction(
  'Set [User UserDetails]',
  props<{
    user: {username: string, email: string, role: string}
  }>()
);

const logoutUser = createAction(
  'Logout [User token]'
);

export { setUserData, logoutUser };
