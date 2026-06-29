import { Injectable } from '@nestjs/common';

export interface PublicProfileSettings {
  auth0Subject: string;
  publicName: string;
  displayName: string;
  visibility: 'private' | 'public';
}

@Injectable()
export class ProfileService {
  private readonly profiles = new Map<string, PublicProfileSettings>();

  getMyProfile(auth0Subject: string, email?: string) {
    return this.ensureProfile(auth0Subject, email);
  }

  updateSettings(auth0Subject: string, input: Partial<Pick<PublicProfileSettings, 'publicName' | 'displayName' | 'visibility'>>) {
    const current = this.ensureProfile(auth0Subject);
    const updated = {
      ...current,
      ...input,
    };
    this.profiles.set(auth0Subject, updated);
    return updated;
  }

  findPublicProfile(publicName: string) {
    const profile = [...this.profiles.values()].find((candidate) => candidate.publicName === publicName);
    return profile ?? this.previewProfile(publicName);
  }

  listCharacters(publicName: string) {
    return {
      publicName,
      sourceOfTruth: 'Game Platform Service read model',
      characters: [
        {
          externalCharacterId: 'preview-barbarian',
          characterName: 'Rook',
          className: 'Barbarian',
          level: 12,
          readOnly: true,
        },
      ],
    };
  }

  listAchievements(publicName: string) {
    return {
      publicName,
      sourceOfTruth: 'Game Platform Service read model',
      achievements: [
        {
          externalAchievementId: 'first-blood-preview',
          title: 'First Blood',
          readOnly: true,
        },
      ],
    };
  }

  private ensureProfile(auth0Subject: string, email?: string) {
    const existing = this.profiles.get(auth0Subject);
    if (existing) return existing;

    const fallbackName = email?.split('@')[0] ?? auth0Subject.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    const profile: PublicProfileSettings = {
      auth0Subject,
      publicName: fallbackName,
      displayName: fallbackName,
      visibility: 'private',
    };
    this.profiles.set(auth0Subject, profile);
    return profile;
  }

  private previewProfile(publicName: string) {
    return {
      auth0Subject: null,
      publicName,
      displayName: publicName,
      visibility: 'public',
      sourceOfTruth: 'website database',
      preview: true,
    };
  }
}
