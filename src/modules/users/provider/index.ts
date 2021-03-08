import { container } from 'tsyringe';

import { IHashProvider } from './models/IHash';
import { Hash } from './implementation/HashProvider';

container.registerSingleton<IHashProvider>('HashProvider', Hash);
