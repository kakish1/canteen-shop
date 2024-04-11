@Html.Partial("HomeSidebar", new ViewDataDictionary { { "ActiveMenu", ViewBag.ActiveMenu } })
@{
    var activeMenu = ViewData["ActiveMenu"];
}
