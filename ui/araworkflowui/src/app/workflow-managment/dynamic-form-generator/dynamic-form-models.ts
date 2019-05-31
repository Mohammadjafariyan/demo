/*
export class Form {
  // نام فرم
  Name: string;

  // ادرس برای ارسال اطلاعات ورودی کاربر
  Url: string;

  // نوع ارسال Get یا Post
  Action: string;
  // نوع نمایش فرم در bootstrap
  IsInline: string;
}
*/

export enum InputType {
  Hidden,
  Select, Number, Text, Textarea, Password, Email, Phone, Telephone, Checkbox, Radio, MultiSelect, File, Image
}

export class MyInput {


  constructor(Order: number, Name: string,
              FarsiName: string, Value: any
              , Type: InputType,
              PlaceHolder?: string, Title?: string
              , Options?: any[]) {
    this.Order = Order;
    this.Name = Name;
    this.FarsiName = FarsiName;
    this.Value = Value;
    this.Type = Type;
    this.PlaceHolder = PlaceHolder;
    this.Title = Title;
    this.Options = Options;
  }

// اولویت نمایش
  Order: number;
  // نام
  Name: string;

  // نام نمایشی برای کاربر
  FarsiName: string;
  // مقدار وارد شده توسط کاربر
  Value: any;

  // نوع این ورودی
  Type: InputType;
  PlaceHolder: string;

  // نمایش هنگامی که کاربر روی آن موس می رود
  Title: string;
  Options: any[];

  OptionTextName;
  OptionValueName;

}

export class AraOption {
  Name: string;
  Value: any;
}

export class Validation {
  Regex;
  Size;
  MinLength;
  MaxLength;
  // For Image and Files
  Count;
  Required;
  ReadOnly;
}
