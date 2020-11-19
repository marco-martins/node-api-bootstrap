/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.ts, and set `seedDB: false`
 */

import config from './environment/'
import { User } from '../api/user/user.model'

export default function seedDatabaseIfNeeded () {
  if (!config.seedDB) { return }

  // Create users sampler
  User.deleteMany({})
    .then(() => {
      User.create(
        {
          firstName: 'John',
          lastName: 'Snow',
          email: 'john.snow@got.com',
          password: 'password-test'
        },
        {
          firstName: 'Daenerys',
          lastName: 'Targaryen',
          email: 'daenerys.targaryen@got.com',
          password: 'password-test'
        }
      )
        .then(() => console.log('[INFO] Finished populating users'))
        .catch(err => console.log('[ERROR] Populating users', err))
    })
}
