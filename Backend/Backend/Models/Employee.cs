using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Employee
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string? Address { get; set; }

    public byte? Gender { get; set; }

    public DateTime BirthDay { get; set; }
}
