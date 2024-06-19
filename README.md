<Details><Detail><Selected>False</Selected><Text>Акт на землю</Text><Value>1.4</Value><Selected>False</Selected><Text>Акт приемки объекта в эксплуатацию, решение на ЗУ</Text><Value>1.5</Value><Selected>True</Selected><Text>Договор дарения</Text><Value>1.6</Value><Selected>False</Selected><Text>Договор купли продажи</Text><Value>1.1</Value><Selected>False</Selected><Text>Договор приватизации</Text><Value>1.8</Value><Selected>False</Selected><Text>Иное(обяз поле для заполнения с огр символов)</Text><Value>1.11</Value><Selected>True</Selected><Text>Не вложены документы по движимому имуществу</Text><Value>1.9</Value><Selected>False</Selected><Text>Предварительный договор купли-продажи</Text><Value>1.2</Value><Selected>False</Selected><Text>Свидетельство о праве на наследство по завещанию(по закону)</Text><Value>1.7</Value><Selected>True</Selected><Text>Справка о зарегистрированных правах(обременениях) на недвижимое имущество и его технических характеристика</Text><Value>1.10</Value><Selected>False</Selected><Text>Технический паспорт (Ф-2) на регистрируемые объекты неденжнмости</Text><Value>1.3</Value></Detail></Details>


List<SelectedListItem> = new List<SelectedListItem>() {
  Selected=false,
  Text =123, 
  Value 1
} 


 public string ChosenDetailsToXml(List<SelectListItem> list)
        {

            if (list == null || list.Count == 0) return "";

            XmlDocument xdResult = new XmlDocument();
            xdResult.LoadXml("<Details>" +
                "<Detail />" +
                "</Details>");
            for (int i = 0; i < list.Count; i++)
            {
                XmlElement elem = xdResult.CreateElement("Selected");
                XmlElement elem2 = xdResult.CreateElement("Text");
                XmlElement elem3 = xdResult.CreateElement("Value");
                elem.InnerText = list[i].Selected.ToString();
                elem2.InnerText = list[i].Text.ToString();
                elem3.InnerText = list[i].Value.ToString();
                xdResult.DocumentElement["Detail"].AppendChild(elem);
                xdResult.DocumentElement["Detail"].AppendChild(elem2);
                xdResult.DocumentElement["Detail"].AppendChild(elem3);
            }
            return xdResult.InnerXml;
        }
