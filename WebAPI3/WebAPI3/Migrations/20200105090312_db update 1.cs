using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI3.Migrations
{
    public partial class dbupdate1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_userActivityType_ActivityType_ActivityTypeId",
                table: "userActivityType");

            migrationBuilder.DropForeignKey(
                name: "FK_userActivityType_User_UserId",
                table: "userActivityType");

            migrationBuilder.DropPrimaryKey(
                name: "PK_userActivityType",
                table: "userActivityType");

            migrationBuilder.RenameTable(
                name: "userActivityType",
                newName: "UserActivityType");

            migrationBuilder.RenameIndex(
                name: "IX_userActivityType_UserId",
                table: "UserActivityType",
                newName: "IX_UserActivityType_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_userActivityType_ActivityTypeId",
                table: "UserActivityType",
                newName: "IX_UserActivityType_ActivityTypeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserActivityType",
                table: "UserActivityType",
                column: "UserActivityTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserActivityType_ActivityType_ActivityTypeId",
                table: "UserActivityType",
                column: "ActivityTypeId",
                principalTable: "ActivityType",
                principalColumn: "ActivityTypeId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserActivityType_User_UserId",
                table: "UserActivityType",
                column: "UserId",
                principalTable: "User",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserActivityType_ActivityType_ActivityTypeId",
                table: "UserActivityType");

            migrationBuilder.DropForeignKey(
                name: "FK_UserActivityType_User_UserId",
                table: "UserActivityType");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserActivityType",
                table: "UserActivityType");

            migrationBuilder.RenameTable(
                name: "UserActivityType",
                newName: "userActivityType");

            migrationBuilder.RenameIndex(
                name: "IX_UserActivityType_UserId",
                table: "userActivityType",
                newName: "IX_userActivityType_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserActivityType_ActivityTypeId",
                table: "userActivityType",
                newName: "IX_userActivityType_ActivityTypeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_userActivityType",
                table: "userActivityType",
                column: "UserActivityTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_userActivityType_ActivityType_ActivityTypeId",
                table: "userActivityType",
                column: "ActivityTypeId",
                principalTable: "ActivityType",
                principalColumn: "ActivityTypeId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_userActivityType_User_UserId",
                table: "userActivityType",
                column: "UserId",
                principalTable: "User",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
