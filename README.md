ViewBag.ActiveMenu = "StartPage";
   return View("StartPage");


   @section SideBarMenu{
    @Html.Partial("HomeSidebar");
}


@{
    var a = ViewBag.ActiveItem;
    var b = "";
}


<ul class="nav nav-sidebar">
    <li class="@(ViewBag.ActiveItem == "StartPage" ? "active": "")><a href="@Url.Action("StartPage", "Home", new { @processid = Session["RequestNumber"]})"><i class="glyphicon glyphicon-th-large"></i> Регистрационная форма</a></li>
    @*<li class="@(ViewBag.ActiveItem == "FinInstrumentInfo" ? "active": "")><a href="@Url.Action("FinInstrumentInfo", "Home", new { @ptaskid = Session["TaskID"], @processid = Session["RequestNumber"] })"><i class="glyphicon glyphicon-th-large"></i> Запрашиваемые условия</a></li>*@
    <li class="@(ViewBag.ActiveItem == "DocPack" ? "active": "")><a href="@Url.Action("DocPack", "Home", new { @ptaskid = Session["TaskID"], @processid = Session["RequestNumber"] })"><i class="glyphicon glyphicon-th-large"></i> Пакет документов</a></li>
    <li class="@(ViewBag.ActiveItem == "DeclarationData" ? "active": "")><a href="@Url.Action("DeclarationData", "Home", new { @processid = Session["RequestNumber"]})"><i class="glyphicon glyphicon-th-large"></i> Данные по декларациям</a></li>
    <li class="@(ViewBag.ActiveItem == "ClientHistory" ? "active": "")><a href="@Url.Action("ClientHistory", "Home", new { @ptaskid = Session["TaskID"], @processid = Session["RequestNumber"] })"><i class="glyphicon glyphicon-th-large"></i> История заявок по Заявителю</a></li>
    <li class="@(ViewBag.ActiveItem == "ClientCheck" ? "active": "")><a href="@Url.Action("ClientCheck", "Home", new { @ptaskid = Session["TaskID"], @processid = Session["RequestNumber"] })"><i class="glyphicon glyphicon-th-large"></i> Проверка заемщика и первого руководителя</a></li>
    <li class="@(ViewBag.ActiveItem == "CodebtorCheck" ? "active": "")><a href="@Url.Action("CodebtorCheck", "Home", new { @ptaskid = Session["TaskID"], @processid = Session["RequestNumber"] })"><i class="glyphicon glyphicon-th-large"></i> Проверка созаемщика и первого руководителя</a></li>
    <li class="@(ViewBag.ActiveItem == "GuarantorCheck" ? "active": "")><a href="@Url.Action("GuarantorCheck", "Home", new { @ptaskid = Session["TaskID"], @processid = Session["RequestNumber"] })"><i class="glyphicon glyphicon-th-large"></i> Проверка гаранта и первого руководителя</a></li>
    <li class="@(ViewBag.ActiveItem == "WarrantorCheck" ? "active": "")><a href="@Url.Action("WarrantorCheck", "Home", new { @ptaskid = Session["TaskID"], @processid = Session["RequestNumber"] })"><i class="glyphicon glyphicon-th-large"></i> Проверка поручителя и первого руководителя</a></li>
    <li class="@(ViewBag.ActiveItem == "PledgerCheck" ? "active": "")><a href="@Url.Action("PledgerCheck", "Home", new { @ptaskid = Session["TaskID"], @processid = Session["RequestNumber"] })"><i class="glyphicon glyphicon-th-large"></i> Проверка залогодателя и первого руководителя</a></li>
</ul>
<hr />
<ul class="nav nav-sidebar">
    <li style="cursor: pointer;"><a href="@Url.Action("SendRequest", "Home", new { @processid = Session["RequestNumber"]})" class="SendRequest"><i class="glyphicon glyphicon-send"></i>Отправить</a></li>
    <li style="cursor: pointer;"><a href="@Url.Action("RejectRequest", "Home", new { @processid = Session["RequestNumber"]})" class="RejectRequest"><i class="glyphicon glyphicon-remove"></i>Отменить</a></li>
</ul>



   
