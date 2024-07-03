 <StackPanel Visibility="{Binding IsAvailableSumTextVisible, Converter={StaticResource BooleanToVisibilityConverter}}" Grid.Row="5" Grid.Column="1" Grid.ColumnSpan="3" Orientation="Horizontal" HorizontalAlignment="Center" VerticalAlignment="Center">
            <Label Content="{DynamicResource AmountLimit}" Foreground="#FFFBAE17" FontSize="32" HorizontalAlignment="Center" VerticalAlignment="Center"/>
            <Label Content="{Binding Lim}" Foreground="White" FontWeight="Bold" FontSize="32" HorizontalAlignment="Center" VerticalAlignment="Center"/>
            <Label Content="{Binding TransactionInformation.Currency}" Foreground="White" FontSize="32" HorizontalAlignment="Center" VerticalAlignment="Center"/>
            <!--<Label FontSize="24" TextOptions.TextHintingMode="Animated" Foreground="#FFFBAE17" FontWeight="Bold" HorizontalAlignment="Center" VerticalAlignment="Center">
                <TextBlock TextWrapping="WrapWithOverflow" Text="Доступная сумма для пополнения:" FontWeight="Bold" TextAlignment="Center" HorizontalAlignment="Center" VerticalAlignment="Center" />
            </Label>
            <Label FontSize="24" TextOptions.TextHintingMode="Animated" Foreground="#FFFBAE17" FontWeight="Bold" HorizontalAlignment="Center" VerticalAlignment="Center">
                <TextBlock TextWrapping="WrapWithOverflow" Text="{Binding Lim}" FontWeight="Bold" TextAlignment="Center" HorizontalAlignment="Center" VerticalAlignment="Center" />
            </Label>-->
        </StackPanel>
