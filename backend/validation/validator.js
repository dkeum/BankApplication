const {
  body,
  check,
  oneOf,
  query,
} = require("express-validator");
const {
  transactionRequestStatusEnum: RequestStatusValues,
  transactionStatusEnum: TransactionStatusValues,
} = require("../models/Transaction");
const {
  NotificationTypeEnum: NotificationsTypeValues,
} = require("../models/Notification");

exports.searchValidation = [query("q").exists()];

exports.userFieldsValidator = oneOf([
  check("firstName").exists(),
  check("lastName").exists(),
  check("password").exists(),
  check("balance").exists(),
]);

exports.isBankAccountValidator = [
  body("bankName").isString().trim(),
  body("accountNumber").isString().trim(),
  body("routingNumber").isString().trim(),
];

exports.isUserValidator = [
  body("username").isString().trim(),
  body("password").isString().trim().isLength({ min: 4 }),
  
];

exports.sanitizeTransactionStatus = query("status").customSanitizer((value) => {
  if (includes(value, TransactionStatusValues)) {
    return value;
  }
  return;
});

exports.sanitizeRequestStatus = query("requestStatus").customSanitizer(
  (value) => {
    if (includes(value, RequestStatusValues)) {
      return value;
    }
    return;
  }
);

exports.isTransactionQSValidator = [
  query("status").isIn(TransactionStatusValues).optional().trim(),
  query("requestStatus")
    .optional({ checkFalsy: true })
    .isIn(RequestStatusValues)
    .trim(),
  query("receiverId").optional({ checkFalsy: true }).isString().trim(),
  query("senderId").optional({ checkFalsy: true }).isString().trim(),
  query("rangeStartTs").optional({ checkFalsy: true }).isString().trim(),
  query("rangeEndTs").optional({ checkFalsy: true }).isString().trim(),
  query("amountMax").optional({ checkFalsy: true }).isNumeric().trim(),
  query("amountMin").optional({ checkFalsy: true }).isNumeric().trim(),
];

exports.isTransactionPayloadValidator = [
  body("transactionType").isIn(["payment", "request"]).trim(),
  body("source").optional().isString().trim(),
  body("receiverId").isString().trim(),
  body("description").isString().trim(),
  body("amount").isNumeric().trim().toInt(),
];

exports.isTransactionPatchValidator = [
  body("requestStatus").isIn(RequestStatusValues),
];

exports.isTransactionPublicQSValidator = [
  query("order").optional({ checkFalsy: true }).isIn(["default"]),
];

exports.isCommentValidator = body("content").isString().trim();

exports.isNotificationsBodyValidator = [
  body("items.*.type").isIn(NotificationsTypeValues).trim(),
];

exports.isNotificationPatchValidator = [body("isRead").isBoolean()];

exports.isValidEntityValidator = [
  check("entity")
    .isIn([
      "users",
      "contacts",
      "bankaccounts",
      "notifications",
      "transactions",
      "likes",
      "comments",
      "banktransfers",
    ])
    .trim(),
];
