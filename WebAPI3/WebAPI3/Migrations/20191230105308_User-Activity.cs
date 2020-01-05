using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI3.Migrations
{
    public partial class UserActivity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Activity",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Activity_UserId",
                table: "Activity",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Activity_User_UserId",
                table: "Activity",
                column: "UserId",
                principalTable: "User",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activity_User_UserId",
                table: "Activity");

            migrationBuilder.DropIndex(
                name: "IX_Activity_UserId",
                table: "Activity");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Activity");
        }
    }
}
