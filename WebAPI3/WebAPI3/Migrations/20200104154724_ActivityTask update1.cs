using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI3.Migrations
{
    public partial class ActivityTaskupdate1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ActivityTask",
                table: "ActivityTask");

            migrationBuilder.DropColumn(
                name: "ActivityStatusId",
                table: "ActivityTask");

            migrationBuilder.DropColumn(
                name: "ActivityStatusName",
                table: "ActivityTask");

            migrationBuilder.AddColumn<int>(
                name: "ActivityTaskId",
                table: "ActivityTask",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<string>(
                name: "ActivityTaskName",
                table: "ActivityTask",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ActivityTask",
                table: "ActivityTask",
                column: "ActivityTaskId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ActivityTask",
                table: "ActivityTask");

            migrationBuilder.DropColumn(
                name: "ActivityTaskId",
                table: "ActivityTask");

            migrationBuilder.DropColumn(
                name: "ActivityTaskName",
                table: "ActivityTask");

            migrationBuilder.AddColumn<int>(
                name: "ActivityStatusId",
                table: "ActivityTask",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<string>(
                name: "ActivityStatusName",
                table: "ActivityTask",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ActivityTask",
                table: "ActivityTask",
                column: "ActivityStatusId");
        }
    }
}
