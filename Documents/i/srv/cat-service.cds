using  my.i as db from '../db/data-model';

service CatalogService {
  entity BusinessCard as projection on db.BusinessCard
    actions{  action demo() returns BusinessCard  };

  // action extractBusinessCardInfo() returns String;
  // action a();
}

