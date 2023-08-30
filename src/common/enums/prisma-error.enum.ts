export enum PrismaErrorEnum {
  authenticationFailed = 'P1000',
  couldNotConnectToDatabase = 'P1001',
  connectionTimedOut = 'P1002',
  databaseFileNotFound = 'P1003',
  operationsTimedOut = 'P1008',
  accessDeniedForUser = 'P1010',
  TLSConnectionError = 'P1011',
  unsupportedFeaturesAtPrismaSchema = 'P1015',
  incorrectNumberOfParameters = 'P1016',
  serverClosedConnection = 'P1017',
  valueTooLongForColumnType = 'P2000',
  recordDoesNotExist = 'P2001',
  uniqueConstraintViolation = 'P2002',
  foreignConstraintViolation = 'P2003',
  constraintViolation = 'P2004',
  invalidValueForFieldType = 'P2005',
  invalidValue = 'P2006',
  validationError = 'P2007',
  queryParsingError = 'P2008',
  queryValidationError = 'P2009',
  rawQueryError = 'P2010',
  nullConstraintViolation = 'P2011',
  missingRequiredValue = 'P2012',
  missingRequiredArgument = 'P2013',
  requiredRelationViolation = 'P2014',
  relatedRecordNotFound = 'P2015',
  interpretationError = 'P2016',
  recordsForParentAndChildNotConnected = 'P2017',
  requiredConnnectedRecordsNotFound = 'P2018',
  inputError = 'P2019',
  valueOutOfRange = 'P2020',
  tableDoesNotExist = 'P2021',
  columnDoesNotExist = 'P2022',
  inconsistentColumnData = 'P2023',
  timedOutFetchingConnectionFromThePool = 'P2024',
  recordsRequiredForOperationNotFound = 'P2025',
  unsupportedProviderFeature = 'P2026',
  multipleErrors = 'P2027',
  transactionAPIError = 'P2028',
  noFulltextIndex = 'P2030',
  numberOutOfRange = 'P2033',
  transactionFailed = 'P2034',
}