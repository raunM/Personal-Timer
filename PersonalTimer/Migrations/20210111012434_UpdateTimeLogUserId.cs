using Microsoft.EntityFrameworkCore.Migrations;

namespace PersonalTimer.Migrations
{
    public partial class UpdateTimeLogUserId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "TimeLog",
                maxLength: 450,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "TimeLog",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 450);
        }
    }
}
