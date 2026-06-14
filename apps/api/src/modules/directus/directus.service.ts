import { Injectable } from '@nestjs/common';

@Injectable()
export class DirectusService {
  readonly publicUrl = process.env.DIRECTUS_PUBLIC_URL ?? process.env.CMS_PUBLIC_URL ?? 'http://localhost:8055';
}
