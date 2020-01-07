using  my.i as db from '../db/data-model';

service CatalogService {
  entity BusinessCard as projection on db.BusinessCard
    actions{  action extractBusinessCardInfo() returns BusinessCard  };

  // action extractBusinessCardInfo() returns String;
  // action a();
  entity Contacts as projection on db.Contacts;
  entity EmailAddresses as projection on db.EmailAddresses;
}

