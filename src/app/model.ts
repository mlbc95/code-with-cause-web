export class Harvest {
  public readonly entries: Array<Entry>;

  public constructor() {
    this.entries = [];
  }
}

export class Entry {
  public crop: Crop;
  public pounds: number;
  public totalValue: number;
  public harvester: string;
  public farm: Farm;
  public recipient: Recipient;

  public constructor() {
  }
}

export class Farm {
  public name: string;
  public latitude: number;
  public longitude: number;

  public constructor() {
  }
}

export class Crop {
  public name: string;
  public variety: string;
  public pricePerPound: string;

  public constructor() {
  }
}

export enum RecipientType {
  PURCHASE,
  DONATION
}

export abstract class Recipient {
  public readonly recipientType: RecipientType;
  public name: string;
  public organization: string;

  public constructor(recipientType) {
    this.recipientType = recipientType;
  }
}

export class PurchaseRecipient extends Recipient {
  public constructor() {
    super(RecipientType.PURCHASE);
  }
}

export class DonationRecipient extends Recipient {
  public constructor() {
    super(RecipientType.DONATION);
  }
}

export enum UserType {
  ADMIN,
  INTERN
}

export abstract class User {
  public readonly userType: UserType;
  public username: string;
  public password: string;

  public constructor(userType: UserType) {
    this.userType = userType;
  }
}

export class AdminUser extends User {
  public constructor() {
    super(UserType.ADMIN);
  }
}

export class InternUser extends User {
  public constructor() {
    super(UserType.INTERN);
  }
}
