using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI3.Migrations
{
    public partial class Initial_3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActivityColorId",
                table: "Activity");

            migrationBuilder.AddColumn<string>(
                name: "ActivityName",
                table: "Activity",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "ActivityStatusId",
                table: "Activity",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ActivityStatus",
                columns: table => new
                {
                    ActivityStatusId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ActivityStatusName = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityStatus", x => x.ActivityStatusId);
                });

            migrationBuilder.CreateTable(
                name: "ActivityTask",
                columns: table => new
                {
                    ActivityStatusId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ActivityStatusName = table.Column<string>(nullable: false),
                    ActivityId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityTask", x => x.ActivityStatusId);
                    table.ForeignKey(
                        name: "FK_ActivityTask_Activity_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activity",
                        principalColumn: "ActivityId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Activity_ActivityStatusId",
                table: "Activity",
                column: "ActivityStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityTask_ActivityId",
                table: "ActivityTask",
                column: "ActivityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Activity_ActivityStatus_ActivityStatusId",
                table: "Activity",
                column: "ActivityStatusId",
                principalTable: "ActivityStatus",
                principalColumn: "ActivityStatusId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activity_ActivityStatus_ActivityStatusId",
                table: "Activity");

            migrationBuilder.DropTable(
                name: "ActivityStatus");

            migrationBuilder.DropTable(
                name: "ActivityTask");

            migrationBuilder.DropIndex(
                name: "IX_Activity_ActivityStatusId",
                table: "Activity");

            migrationBuilder.DropColumn(
                name: "ActivityName",
                table: "Activity");

            migrationBuilder.DropColumn(
                name: "ActivityStatusId",
                table: "Activity");

            migrationBuilder.AddColumn<int>(
                name: "ActivityColorId",
                table: "Activity",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
