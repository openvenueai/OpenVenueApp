type DateInput = Date | string | number | null | undefined;

type CurrencyOptions = {
  currency?: string;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  notation?: Intl.NumberFormatOptions["notation"];
};

type DateFormatOptions = Intl.DateTimeFormatOptions & {
  locale?: string;
};

function toDate(value: DateInput) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const date = value instanceof Date ? value : new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatCurrency(
  value: number | null | undefined,
  options: CurrencyOptions = {},
) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "—";
  }

  const {
    currency = "USD",
    locale = "en-US",
    minimumFractionDigits,
    maximumFractionDigits,
    notation,
  } = options;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
    notation,
  }).format(value);
}

export function formatDate(
  value: DateInput,
  options: DateFormatOptions = {},
) {
  const date = toDate(value);

  if (!date) {
    return "—";
  }

  const { locale = "en-US", ...dateOptions } = options;

  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    ...dateOptions,
  }).format(date);
}

export function formatDateTime(
  value: DateInput,
  options: DateFormatOptions = {},
) {
  const date = toDate(value);

  if (!date) {
    return "—";
  }

  const { locale = "en-US", ...dateOptions } = options;

  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
    ...dateOptions,
  }).format(date);
}
