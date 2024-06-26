            builder.Register(ctx => new HttpClient() { BaseAddress = new Uri(ConfigurationManager.AppSettings["AntiFraudUri"]), Timeout = TimeSpan.FromMilliseconds(10000) }).Named<HttpClient>("AntiFraud").SingleInstance();
            builder.Register(ctx => new AntiFraudController(ctx.ResolveNamed<HttpClient>("AntiFraud"))).InstancePerDependency();


                public class AntiFraudController : ApiController
    {
        private HttpClient _antiFraudHttpClient;
        private readonly ILogger _logger;
        private readonly HomeBankApiServiceSoapClient _homeBankApiServiceSoapClient;

        public AntiFraudController(HttpClient httpClient, HomeBankApiServiceSoapClient homeBankApiServiceSoapClient)
        {
            _antiFraudHttpClient = httpClient;
            _logger = new LoggerAdapter(NLog.LogManager.GetCurrentClassLogger());
            _homeBankApiServiceSoapClient = homeBankApiServiceSoapClient;
        }
