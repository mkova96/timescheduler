using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI3.Migrations
{
    public partial class Initial_2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activity_ActivityColor_ActivityColorId",
                table: "Activity");

            migrationBuilder.DropIndex(
                name: "IX_Activity_ActivityColorId",
                table: "Activity");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Activity_ActivityColorId",
                table: "Activity",
                column: "ActivityColorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Activity_ActivityColor_ActivityColorId",
                table: "Activity",
                column: "ActivityColorId",
                principalTable: "ActivityColor",
                principalColumn: "ActivityColorId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
